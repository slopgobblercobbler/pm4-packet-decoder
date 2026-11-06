#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItWaitOnCeCounterDef {
    static constexpr std::uint8_t opcode = 0x88;
    static constexpr std::string_view name = "IT_WAIT_ON_CE_COUNTER";
    static constexpr std::string_view desc = "Micro Engine halt until Constant Engine counter matches comparison";
};
}
