#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetShRegPairsDef {
    static constexpr std::uint8_t opcode = 0x49;
    static constexpr std::string_view name = "IT_SET_SH_REG_PAIRS";
    static constexpr std::string_view desc = "Write array of (register, value) shader register pairs";
};
}
