#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItWaitCeCounterDef {
    static constexpr std::uint8_t opcode = 0x87;
    static constexpr std::string_view name = "IT_WAIT_CE_COUNTER";
    static constexpr std::string_view desc = "Wait for constant engine counter to reach specified synchronization threshold";
};
}
