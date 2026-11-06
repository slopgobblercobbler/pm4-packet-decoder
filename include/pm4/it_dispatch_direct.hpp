#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDispatchDirectDef {
    static constexpr std::uint8_t opcode = 0x15;
    static constexpr std::string_view name = "IT_DISPATCH_DIRECT";
    static constexpr std::string_view desc = "Direct compute shader workgroup grid execution dispatch";
};
}
